"""Tests for simulation module."""

from app.portfolio import PORTFOLIOS
from app.simulation import create_simulation, step_simulation, SimulationState


def test_create_simulation():
    p = PORTFOLIOS[0]
    sim = create_simulation(p, 1000.0)
    assert sim.initial_investment == 1000.0
    assert sim.current_value > 0
    assert len(sim.history) > 1  # initial + simulated steps


def test_step_changes_value():
    p = PORTFOLIOS[0]
    sim = SimulationState(
        portfolio_name=p.name,
        initial_investment=1000.0,
        current_value=1000.0,
        history=[1000.0],
    )
    old_value = sim.current_value
    # Run many steps — statistically almost impossible all are identical
    for _ in range(20):
        step_simulation(sim, p)
    assert len(sim.history) == 21
    # At least some step should have changed the value
    assert any(h != 1000.0 for h in sim.history[1:])


def test_profit_computation():
    sim = SimulationState(
        portfolio_name="test",
        initial_investment=1000.0,
        current_value=1050.0,
        history=[1000.0, 1050.0],
    )
    assert sim.profit == 50.0
    assert abs(sim.return_pct - 5.0) < 0.01


def test_history_recorded():
    p = PORTFOLIOS[1]
    sim = create_simulation(p, 500.0)
    initial_len = len(sim.history)
    step_simulation(sim, p)
    assert len(sim.history) == initial_len + 1
