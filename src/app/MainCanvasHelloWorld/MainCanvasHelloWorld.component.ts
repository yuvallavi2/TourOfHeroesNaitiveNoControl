import { Component } from "@angular/core";
import { BaseTaskMagicComponent } from "../magic/src/ui/app.baseMagicComponent";
import { TaskMagicService } from "../magic/src/services/task.magics.service";

@Component({
	selector: "mga-MainCanvasHelloWorld",
	providers: [TaskMagicService],
	styleUrls: ["./MainCanvasHelloWorld.component.css"],
	templateUrl: "./MainCanvasHelloWorld.component.html"
})
export class MainCanvasHelloWorld extends BaseTaskMagicComponent {}
