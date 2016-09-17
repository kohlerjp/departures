defmodule Departures.PageController do
  use Departures.Web, :controller

  def index(conn, _params) do
    IO.puts "DEPARTURES IS"
    IO.inspect Departures.DepartChannel.get_latest
    render conn, "index.html", schedule: Departures.DepartChannel.get_latest()
  end
end
