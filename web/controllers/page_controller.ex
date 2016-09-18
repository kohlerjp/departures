defmodule Departures.PageController do
  use Departures.Web, :controller

  def index(conn, _params) do
    # TODO: the schedule value is never being used here. The React component should
    # utilize this value from the controller instead of retrieving it from on
    # the socket connection
    render conn, "index.html", schedule: Departures.DepartChannel.get_latest()
  end
end
