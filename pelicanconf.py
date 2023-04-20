from datetime import datetime

JINJA_FILTERS = {
    'strptime': datetime.strptime,
}

AUTHOR = 'Vladimir Nikolic'
SITENAME = 'Vladimir Nikolic'
SITEURL = ''

PATH = 'content'
TIMEZONE = 'America/Vancouver'
DEFAULT_LANG = 'en'
THEME = 'theme'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

STATIC_PATHS = [ 'images' ]

TYPOGRIFY = True

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

USE_FOLDER_AS_CATEGORY = True

CATEGORY_URL = '{slug}'
CATEGORY_SAVE_AS = '{slug}.html'

ARTICLE_URL = '{category}/{slug}'
ARTICLE_SAVE_AS = '{category}/{slug}.html'

PAGE_URL = '{slug}'
PAGE_SAVE_AS = '{slug}.html'

TAG_URL = 'tag/{slug}'
TAG_SAVE_AS = 'tag/{slug}.html'

# Do not generate drafts, authors, archives, index
DRAFT_SAVE_AS = ''
AUTHOR_SAVE_AS = ''
ARCHIVES_SAVE_AS = ''

DIRECT_TEMPLATES = [ 'index', 'tags']

DEFAULT_PAGINATION = 20
PAGINATED_TEMPLATES = {
    'category' : None,
    'tag' : None,
}

SUMMARY_MAX_LENGTH = 30

CATEGORIES_WITH_SUMMARY = { 'reports', 'projects' }
CATEGORIES_WITH_PUB_DATE = { 'reports', 'projects', 'poems' }
CATEGORIES_WITH_MOD_DATE = { 'reports', 'projects' }

DEFAULT_DATE_FORMAT = '%b %d, %Y'

PLUGINS = [
    #'minify'
]

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
