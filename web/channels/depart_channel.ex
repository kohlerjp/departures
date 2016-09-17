
defmodule Departures.DepartChannel do
  use Phoenix.Channel

  def get_latest() do
    [{_, latest} | _] = :ets.lookup(:latest, :schedule)
    latest
  end

  def handle_in("update", %{"schedule" => schedule}, _socket) do
    :ets.insert(:latest, {:schedule, schedule}) # Cache the latest schedule
  end

  def join("depart", _message, socket) do
    {:ok, %{:schedule => get_latest()}, socket}
  end



end