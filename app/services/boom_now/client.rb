
module BoomNow
  class Client
    BASE_URL = ENV.fetch("BOOM_NOW_BASE_URL", "https://app.boomnow.com/open_api/v1/")

    ApiError = Class.new(StandardError)

    def initialize
      @client_id = ENV.fetch("BOOM_NOW_API_ID")
      @client_secret = ENV.fetch("BOOM_NOW_API_SECRET")
    end

    def search_hotels(location:, adults:)
      token = fetch_access_token
      response = connection.get("listings") do |req|
        req.params = { location: location, adults: adults }
        req.headers["Authorization"] = "Bearer #{token}"
      end

      handle_response(response)
    end

    private

    def fetch_access_token
      return @access_token if @access_token

      response = connection.post("auth/token") do |req|
        req.body = {
          client_id: @client_id,
          client_secret: @client_secret
        }
      end

      if response.status == 201
        data = JSON.parse(response.body)
        @access_token = data["access_token"]
      else
        raise ApiError, "Auth failed: #{response.status} - #{response.body}"
      end
    end

    def connection
      @connection ||= Faraday.new(url: BASE_URL) do |f|
        f.request :json
        f.headers["Content-Type"] = "application/json"
        f.headers["Accept"] = "application/json"
        f.adapter Faraday.default_adapter
      end
    end

    def handle_response(response)
      return JSON.parse(response.body) if response.status == 200
      raise ApiError, "API Error: #{response.status} - #{response.body}"
    end
  end
end
