defmodule Departures.DepartChannel do
  use Phoenix.Channel

  def get_latest() do
    [{_, latest} | _] = :ets.lookup(:latest, :schedule)
    latest
  end

  def join("depart", _message, socket) do
    {:ok, %{:schedule => get_latest()}, socket}
  end



end