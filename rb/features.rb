# Openverse SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module OpenverseFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenverseBaseFeature.new
    when "ratelimit"
      OpenverseRatelimitFeature.new
    when "retry"
      OpenverseRetryFeature.new
    when "test"
      OpenverseTestFeature.new
    when "timeout"
      OpenverseTimeoutFeature.new
    else
      OpenverseBaseFeature.new
    end
  end
end
