import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { sanityClient, urlFor } from '@/lib/sanity'
import { format } from 'date-fns'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'

// Define TypeScript interfaces
interface BlogPost {
  _id: string
  title: {
    en: string
    ka: string
    ru: string
  }
  slug: {
    current: string
  }
  description: {
    en: string
    ka: string
    ru: string
  }
  mainImage: any
  publishedAt: string
}

const BlogPage = () => {
  const { t, i18n } = useTranslation()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
  const navigate = useNavigate()

  // Update when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(i18n.language)
      // Refetch posts when language changes
      fetchPosts()
    }

    // Listen for language change events
    i18n.on('languageChanged', handleLanguageChange)
    
    // Initial fetch
    fetchPosts()

    // Cleanup listener
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const query = `*[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        description,
        mainImage,
        publishedAt
      }`
      
      const result = await sanityClient.fetch(query)
      setPosts(result)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      setLoading(false)
    }
  }

  const getCurrentLanguageContent = (field: { en: string; ka: string; ru: string }) => {
    return field[i18n.language as keyof typeof field] || field.en
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            {t('blog.title') || 'Our Blog'}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {t('blog.subtitle') || 'Discover the latest insights, stories, and updates from our team'}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">No blog posts yet</h2>
            <p className="text-slate-400 mb-8">Check back soon for new content!</p>
            <Button 
              onClick={() => navigate('/')} 
              variant="outline"
              className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
            >
              Back to Home
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card 
                key={post._id} 
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 hover:border-amber-500/50 transition-all duration-300 overflow-hidden group"
              >
                <div className="overflow-hidden">
                  {post.mainImage && (
                    <img 
                      src={urlFor(post.mainImage).url()} 
                      alt={getCurrentLanguageContent(post.title)}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-slate-400 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {post.publishedAt && format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                    {getCurrentLanguageContent(post.title)}
                  </h3>
                  
                  <p className="text-slate-300 mb-6 line-clamp-3">
                    {getCurrentLanguageContent(post.description)}
                  </p>
                  
                  <Link to={`/blog/${post.slug.current}`}>
                    <Button 
                      variant="outline" 
                      className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 transition-colors"
                    >
                      {t('blog.readMore') || 'Read More'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPage