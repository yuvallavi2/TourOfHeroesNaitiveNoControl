import { Component } from "@angular/core";
import { BaseTaskMagicComponent } from "../magic/src/ui/app.baseMagicComponent";
import { TaskMagicService } from "../magic/src/services/task.magics.service";

@Component({
	selector: "mga-Heroes",
	providers: [TaskMagicService],
	styleUrls: ["./Heroes.component.css"],
	templateUrl: "./Heroes.component.html"
})
export class Heroes extends BaseTaskMagicComponent {}
