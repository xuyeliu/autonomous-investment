"""Portfolio performance simulation (no real trading)."""

import random
import math
from dataclasses import dataclass, field

from app.portfolio import Portfolio


@dataclass
class SimulationState:
    portfolio_name: str
    initial_investment: float
    current_value: float
    history: list[float] = field(default_factory=list)

    @property
    def profit(self) -> float:
        return self.current_value - self.initial_investment

    @property
    def return_pct(self) -> float:
        if self.initial_investment == 0:
            return 0.0
        return (self.current_value - self.initial_investment) / self.initial_investment * 100


def create_simulation(portfolio: Portfolio, amount: float) -> SimulationState:
    """Initialize a new simulation for an investment."""
    sim = SimulationState(
        portfolio_name=portfolio.name,
        initial_investment=amount,
        current_value=amount,
        history=[amount],
    )
    # Run a few simulated steps so there's immediate data
    for _ in range(3):
        step_simulation(sim, portfolio)
    return sim


def step_simulation(sim: SimulationState, portfolio: Portfolio) -> None:
    """Advance the simulation by one period (roughly a week)."""
    dt = 1 / 52  # weekly step
    drift = portfolio.expected_return * dt
    vol = portfolio.volatility * math.sqrt(dt)
    shock = random.gauss(0, 1)
    factor = math.exp(drift + vol * shock)
    sim.current_value = round(sim.current_value * factor, 2)
    sim.history.append(sim.current_value)
