import { Component } from "@angular/core";
import { BaseTaskMagicComponent } from "../magic/src/ui/app.baseMagicComponent";
import { TaskMagicService } from "../magic/src/services/task.magics.service";

@Component({
	selector: "mga-Dashboard",
	providers: [TaskMagicService],
	styleUrls: ["./Dashboard.component.css"],
	templateUrl: "./Dashboard.component.html"
})
export class Dashboard extends BaseTaskMagicComponent {}
