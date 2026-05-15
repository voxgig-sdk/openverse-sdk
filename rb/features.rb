# Openverse SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module OpenverseFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenverseBaseFeature.new
    when "test"
      OpenverseTestFeature.new
    else
      OpenverseBaseFeature.new
    end
  end
end
