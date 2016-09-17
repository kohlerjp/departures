defmodule ScheduleParser do
  use Phoenix.Channel

  def update do
    csv_path = "http://developer.mbta.com/lib/gtrtfs/Departures.csv" 
    %HTTPoison.Response{body: body} = HTTPoison.get!(csv_path)
    {:ok, table} = body |> ExCsv.parse(headings: true)
    schedule = Enum.map(table.body, &to_map/1)
    Departures.Endpoint.broadcast("depart", "update", %{:schedule => schedule})
    :ets.insert(:latest, {:schedule, schedule}) # Cache the latest schedule
  end

  def to_map(row) do
    [timestamp, origin, trip, dest, scheduled, lateness, track, status] = row
    %{:timestamp => timestamp, 
      :origin => origin, 
      :trip => trip,
      :dest => dest,
      :scheduled => scheduled, 
      :lateness => lateness,
      :track => track, 
      :status => status}
  end
  

end