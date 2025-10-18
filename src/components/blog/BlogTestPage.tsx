import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mockBlogPosts } from '@/lib/mockData'
import { format } from 'date-fns'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

const BlogTestPage = () => {
  const { t, i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
    setCurrentLanguage(lang)
  }

  const getCurrentLanguageContent = (field: { en: string; ka: string; ru: string }) => {
    return field[i18n.language as keyof typeof field] || field.en
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog Multilingual Test</h1>
        
        <div className="flex justify-center gap-4 mb-12">
          <Button 
            onClick={() => handleLanguageChange('en')}
            variant={currentLanguage === 'en' ? 'default' : 'outline'}
            className={currentLanguage === 'en' ? 'bg-amber-500 hover:bg-amber-600' : ''}
          >
            English
          </Button>
          <Button 
            onClick={() => handleLanguageChange('ka')}
            variant={currentLanguage === 'ka' ? 'default' : 'outline'}
            className={currentLanguage === 'ka' ? 'bg-amber-500 hover:bg-amber-600' : ''}
          >
            Georgian
          </Button>
          <Button 
            onClick={() => handleLanguageChange('ru')}
            variant={currentLanguage === 'ru' ? 'default' : 'outline'}
            className={currentLanguage === 'ru' ? 'bg-amber-500 hover:bg-amber-600' : ''}
          >
            Russian
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockBlogPosts.map((post) => (
            <Card 
              key={post._id} 
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700"
            >
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-slate-400 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {post.publishedAt && format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                </div>
                
                <h3 className="text-xl font-bold mb-3">
                  {getCurrentLanguageContent(post.title)}
                </h3>
                
                <p className="text-slate-300 mb-6">
                  {getCurrentLanguageContent(post.description)}
                </p>
                
                <Link to={`/blog/${post.slug.current}`}>
                  <Button 
                    variant="outline" 
                    className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                  >
                    {t('blog.readMore') || 'Read More'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogTestPage