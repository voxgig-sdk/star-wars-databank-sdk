# StarWarsDatabank SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module StarWarsDatabankFeatures
  def self.make_feature(name)
    case name
    when "base"
      StarWarsDatabankBaseFeature.new
    when "test"
      StarWarsDatabankTestFeature.new
    else
      StarWarsDatabankBaseFeature.new
    end
  end
end
