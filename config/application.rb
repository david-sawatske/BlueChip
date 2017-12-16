require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module BlueChip
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    config.generators do |g|
      g.assets false
      g.helper false
      g.template_engine false
      g.test_framework  nil
      g.stylesheets false
      g.skip_routes  true
    end
  end
end
