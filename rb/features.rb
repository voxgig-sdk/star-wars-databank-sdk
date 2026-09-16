# StarWarsDatabank SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module StarWarsDatabankFeatures
  def self.make_feature(name)
    case name
    when "base"
      StarWarsDatabankBaseFeature.new
    when "ratelimit"
      StarWarsDatabankRatelimitFeature.new
    when "retry"
      StarWarsDatabankRetryFeature.new
    when "test"
      StarWarsDatabankTestFeature.new
    when "timeout"
      StarWarsDatabankTimeoutFeature.new
    else
      StarWarsDatabankBaseFeature.new
    end
  end
end
