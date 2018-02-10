import { ComponentListBase } from "./ComponentListBase";
import { Component } from "@angular/core";

import { SPAcontainer } from "./SPAcontainer/SPAcontainer.component";

import { TopPanel } from "./TopPanel/TopPanel.component";

import { MainMenu } from "./MainMenu/MainMenu.component";

import { MainCanvasHelloWorld } from "./MainCanvasHelloWorld/MainCanvasHelloWorld.component";

import { Dashboard } from "./Dashboard/Dashboard.component";

import { Heroes } from "./Heroes/Heroes.component";

export class ComponentsList extends ComponentListBase {
	static compHash: { [x: string]: any } = {
		SPAcontainer: SPAcontainer,

		TopPanel: TopPanel,

		MainMenu: MainMenu,

		MainCanvasHelloWorld: MainCanvasHelloWorld,

		Dashboard: Dashboard,

		Heroes: Heroes
	};

	static ComponentArray: any[] = [
		SPAcontainer,

		TopPanel,

		MainMenu,

		MainCanvasHelloWorld,

		Dashboard,

		Heroes
	];

	static getArray() {
		return this.ComponentArray;
	}

	public getComponents(name: string): Component {
		return ComponentsList.compHash[name];
	}

	public static getAllComponents() {
		return this.ComponentArray;
	}
}
