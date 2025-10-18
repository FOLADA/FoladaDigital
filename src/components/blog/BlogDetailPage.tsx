import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { sanityClient, urlFor } from '@/lib/sanity'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowLeft } from 'lucide-react'

// Define TypeScript interface
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
  body: {
    en: string
    ka: string
    ru: string
  }
  mainImage: any
  publishedAt: string
}

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
  const navigate = useNavigate()

  // Update when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(i18n.language)
      // Refetch post when language changes
      if (slug) {
        fetchPost()
      }
    }

    // Listen for language change events
    i18n.on('languageChanged', handleLanguageChange)
    
    // Cleanup listener
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n, slug])

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug])

  const fetchPost = async () => {
    setLoading(true)
    try {
      const query = `*[_type == "blogPost" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        description,
        body,
        mainImage,
        publishedAt
      }`
      
      const result = await sanityClient.fetch(query, { slug })
      setPost(result)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching blog post:', error)
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
          <p className="text-slate-300">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <p className="text-slate-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Button 
            onClick={() => navigate('/blog')} 
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
          >
            Back to Blog
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white">
      <div className="container mx-auto px-6 py-20">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/blog')}
          className="mb-8 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('blog.backToBlog') || 'Back to Blog'}
        </Button>

        <article className="max-w-4xl mx-auto">
          {post.mainImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={urlFor(post.mainImage).url()} 
                alt={getCurrentLanguageContent(post.title)}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          <div className="flex items-center text-slate-400 mb-6">
            <Calendar className="w-5 h-5 mr-2" />
            {post.publishedAt && format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            {getCurrentLanguageContent(post.title)}
          </h1>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {getCurrentLanguageContent(post.description)}
            </p>
            
            <div className="text-slate-200 leading-relaxed whitespace-pre-line">
              {getCurrentLanguageContent(post.body)}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default BlogDetailPage