import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  state = {
    error: null,
    meal_price: "",
    tax_rate: "",
    tip_percentage: "",
    subtotal: 0,
    tip: 0,
    total: 0,
    tip_total: 0,
    meal_count: 0,
    avg_tip_per_meal: 0,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { base_meal_price, tax_rate, tip_percentage } = e.target;
    const fields = [
      base_meal_price.value,
      tax_rate.value,
      tip_percentage.value,
    ];
    let error = false;
    fields.forEach((field) => {
      if (isNaN(Number(field))) {
        error = true;
      }
    });
    if (error) {
      this.setState({
        error: "Field must be a number",
      });
    } else {
      let subtotal = Number(base_meal_price.value) * (1 + tax_rate.value / 100);
      let tip = subtotal * Number(tip_percentage.value / 100);
      let total = subtotal + tip;
      let tip_total = this.state.tip_total + tip;
      let meal_count = this.state.meal_count + 1;
      let avg_tip_per_meal = tip_total / meal_count;
      this.setState({
        subtotal,
        tip,
        total,
        tip_total,
        meal_count,
        avg_tip_per_meal
      });
    }
  };

  clearForm = () => {
    this.setState({
      meal_price: "",
      tax_rate: "",
      tip_percentage: "",
    });
  };

  reset = () => {
    this.setState({
      meal_price: "",
      tax_rate: "",
      tip_percentage: "",
      subtotal: 0,
      tip: 0,
      total: 0,
      tip_total: 0,
      meal_count: 0,
      avg_tip_per_meal: 0,
    });
  };

  setMealPrice = (e) => {
    this.setState({
      meal_price: e.target.value,
    });
  };

  setTaxRate = (e) => {
    this.setState({
      tax_rate: e.target.value,
    });
  };

  setTipPercentage = (e) => {
    this.setState({
      tip_percentage: e.target.value,
    });
  };

  render() {
    return (
      <div className="App">
        <h1 id="title">Waitstaff Calculator</h1>
        <div className="waitstaff_calculator">
          <div className="meal_details">
            <h2 className="meal_title">Enter the meal details</h2>
            <form onSubmit={this.handleSubmit} className="meal_form">
              <div className="input_row">
                {" "}
                <label htmlFor="base_meal_price">Base Meal Price: $ </label>
                <input
                  id="base_meal_price"
                  type="text"
                  name="base_meal_price"
                  value={this.state.meal_price}
                  onChange={this.setMealPrice}
                  required
                />
              </div>
              <div className="input_row">
                <label htmlFor="tax_rate">Tax Rate: % </label>
                <input
                  id="tax_rate"
                  type="text"
                  name="tax_rate"
                  value={this.state.tax_rate}
                  onChange={this.setTaxRate}
                  required
                />
              </div>
              <div className="input_row">
                <label htmlFor="tip_percentage">Tip Percentage: % </label>
                <input
                  id="tip_percentage"
                  type="text"
                  name="tip_percentage"
                  value={this.state.tip_percentage}
                  onChange={this.setTipPercentage}
                  required
                />
              </div>
              {this.state.error && <p id="error_text">{this.state.error}</p>}
              <div className="buttons">
                <button type="submit" id="submit_button">
                  Submit
                </button>
                <button type="button" onClick={this.clearForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <div className="charges_earnings">
            <div className="customer_charges_box">
              <h2 className="charges_title">Customer Charges</h2>
              <div className="summary">
                <p>Subtotal {this.state.subtotal}</p>
                <p id="tip">Tip {this.state.tip}</p>
                <p>Total {this.state.total}</p>
              </div>
            </div>
            <div className="earnings_info_box">
              <h2 className="earnings_info">My Earnings Info</h2>
              <div className="summary">
                <p>Tip Total: {this.state.tip_total}</p>
                <p>Meal count: {this.state.meal_count}</p>
                <p>Average Tip Per Meal: {this.state.avg_tip_per_meal}</p>
              </div>
            </div>
          </div>
        </div>
        <button type="button" onClick={this.reset} id="reset_button">
          Reset
        </button>
      </div>
    );
  }
}

export default App;
