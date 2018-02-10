import { Component } from "@angular/core";
import { BaseTaskMagicComponent } from "../magic/src/ui/app.baseMagicComponent";
import { TaskMagicService } from "../magic/src/services/task.magics.service";

@Component({
	selector: "mga-SPAcontainer",
	providers: [TaskMagicService],
	styleUrls: ["./SPAcontainer.component.css"],
	templateUrl: "./SPAcontainer.component.html"
})
export class SPAcontainer extends BaseTaskMagicComponent {}
