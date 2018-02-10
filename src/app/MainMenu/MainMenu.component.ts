import { Component } from "@angular/core";
import { BaseTaskMagicComponent } from "../magic/src/ui/app.baseMagicComponent";
import { TaskMagicService } from "../magic/src/services/task.magics.service";

@Component({
	selector: "mga-MainMenu",
	providers: [TaskMagicService],
	styleUrls: ["./MainMenu.component.css"],
	templateUrl: "./MainMenu.component.html"
})
export class MainMenu extends BaseTaskMagicComponent {}
