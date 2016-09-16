# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :departures,
  ecto_repos: [Departures.Repo]

# Configures the endpoint
config :departures, Departures.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "Kytl0I++c/Qbkgx7qQbLqfBv5eX1ayOU8BoNQPCakErAGuJOqgegMR4IBJKOJmT/",
  render_errors: [view: Departures.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Departures.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
