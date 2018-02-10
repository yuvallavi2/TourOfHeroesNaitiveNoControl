import { Component } from "@angular/core";
import { BaseTaskMagicComponent } from "../magic/src/ui/app.baseMagicComponent";
import { TaskMagicService } from "../magic/src/services/task.magics.service";

@Component({
	selector: "mga-TopPanel",
	providers: [TaskMagicService],
	styleUrls: ["./TopPanel.component.css"],
	templateUrl: "./TopPanel.component.html"
})
export class TopPanel extends BaseTaskMagicComponent {}
