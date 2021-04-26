import React, { Component } from "react";
import "./todo-item.css";
import classNames from "classnames";
export default class TodoItem extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { title, isComplete, onItemChange } = this.props;
		return (
			<div className={classNames({ completed: isComplete })}>
				<input
					className="toggle"
					type="checkbox"
					checked={isComplete}
					onChange={onItemChange}
				/>
				<label>{title}</label>
			</div>
		);
	}
}
