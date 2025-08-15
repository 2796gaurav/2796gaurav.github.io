source 'https://rubygems.org'

gem 'jekyll', '~> 4.3'

group :jekyll_plugins do
  gem 'jekyll-feed', '~> 0.15'
  gem 'jekyll-sitemap', '~> 1.4'
  gem 'jekyll-seo-tag', '~> 2.8'
  gem 'jekyll-paginate', '~> 1.1'
end

gem 'github-pages', '~> 228', group: :jekyll_plugins

group :development do
  gem 'webrick', '~> 1.8'
end

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem 'tzinfo', '~> 1.2'
  gem 'tzinfo-data'
end

gem 'wdm', '~> 0.1', :platforms => [:mingw, :x64_mingw, :mswin]
