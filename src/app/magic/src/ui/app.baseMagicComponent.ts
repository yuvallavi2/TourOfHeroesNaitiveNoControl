import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {GuiCommand, CommandType} from "@magic/gui";
import {TaskMagicService} from "../services/task.magics.service";
import {isNullOrUndefined, isUndefined} from "util";
import {ControlMetadata, HtmlProperties} from "../controls.metadata.model";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';


import {ComponentListBase} from '../../../ComponentListBase';


@Component({
  selector: 'task-magic',
  providers: [TaskMagicService]
})

export abstract class BaseTaskMagicComponent implements OnInit, OnDestroy {

  @Input() myTaskId: string;
  @Input() taskDescription: string;
  subformsDict: { [x: string]: SubformDefinition } = {};
  emptyComp: Component;

  refreshUI: Subject<any> = new Subject();
  private _controlProperties: any;
  protected getvalueCallback = (rowId: string, controlKey: string) => {
    let result = this.task.getFormControl(rowId, controlKey);
    if (!isNullOrUndefined(result))
      return result.value;
  };

  constructor(protected ref: ChangeDetectorRef,
              protected task: TaskMagicService,
              //protected magic:MagicEngine

  ) {
    this.task.Records.createFirst();

    // debugger;
  }

  get controlProperties(): any {
    return this._controlProperties;
  }

  set controlProperties(value: any) {
    this._controlProperties = value;
  }

  get table() {
    return this.task.rows;
  }

  get record() {
    return this.task.ScreenModeControls;
  }

  get taskId() {
    return this.task.taskId;
  }

  get screenFormGroup(): FormGroup {
    return this.record;
  }

  ngOnDestroy(): void {
    this.refreshUI.complete();
    this.task.refreshDom.complete();
  }
  public static componentListBase:ComponentListBase;

  mgGetComp(subformName: string): Component {
    if (subformName in this.subformsDict) {
      let formName: string = this.subformsDict[subformName].formName;
      return BaseTaskMagicComponent.componentListBase.getComponents(formName);
    }
    else
      return this.emptyComp;
  }

  mgGetParameters(subformName: string): any {
    if (subformName in this.subformsDict) {
      return this.subformsDict[subformName].parameters;
    }
    else
      return ""
  }

  addSubformComp(subformControlName: string, formName: string, taskId: string, taskDescription: any) {
    this.subformsDict[subformControlName] = {
      formName,
      parameters: {myTaskId: taskId, taskDescription: taskDescription}
    };
    this.ref.detectChanges();
  }


  ngOnInit() {
    if (this.task.IsStub()) {
      this.loadData();
    }
    else {
      this.task.taskId = this.myTaskId;
      this.task.settemplate(this.taskDescription);
    }
    this.task.buildScreenModeControls();
    this.task.registerGetValueCallback(this.getvalueCallback);
    this.task.initTask();
    this.regUpdatesUI();
  }

  mgGetFormGroupByRow(id: string): FormGroup {
    return this.task.rows[id];
  }

  mgIfRowCreated(id: string): boolean {
    let result = this.mgGetFormGroupByRow(id);
    return !isNullOrUndefined(result);
  }
  refreshDataSource():void {}

  getRowsIfNeed(pageIndex:number, pageSize: number): void {
    if (!this.task.Records.includesLast) {
      for (let i = pageIndex * pageSize ; i < pageIndex * (pageSize + 1)  ; i++) {
        if (!this.task.Records.isRowCreated(i)) {
          this.task.insertEvent("getRows", "table", "" + i);
          console.log("get line");
          break;
        }
      }
    }
  }

  executeCommand(command: GuiCommand): void {
    let rowId: string = (command.line || 0).toString();
    let controlId = command.CtrlName;

    switch (command.CommandType) {
      case CommandType.REFRESH_TASK:

        this.task.ScreenModeControls.patchValue(this.task.ScreenControlsData.Values);
        this.refreshDataSource();
        this.ref.detectChanges();
        break;
      case CommandType.SET_TABLE_ITEMS_COUNT:
        if (!isUndefined(command.number))
          this.task.updateTableSize(command.number);
        this.ref.detectChanges();
        break;

      case CommandType.CREATE_TABLE_ROW:
        this.task.markRowAsCreated(command.number);
        break;

      case CommandType.UNDO_CREATE_TABLE_ROW:
        this.task.markrowAsNotCreated(command.number);
        break;


      case CommandType.SET_TABLE_INCLUDES_FIRST:
        this.task.setIncludesFirst(command.Bool1);
        break;
      case CommandType.SET_TABLE_INCLUDES_LAST:
        this.task.setIncludesLast(command.Bool1);
        break;


      case CommandType.SET_PROPERTY:
        let properties: ControlMetadata;
        properties = this.task.Records.list[rowId].getControlMetadata(controlId);
        properties.properties[command.Operation] = command.obj1;
        break;
      case CommandType.SET_CLASS:
        properties = this.task.Records.list[rowId].getControlMetadata(controlId);
        properties.setClass(command.Operation, command.obj1);
        break;

      case CommandType.SET_STYLE:
        properties = this.task.Records.list[rowId].getControlMetadata(controlId);
        properties.setStyle(command.Operation, command.obj1);
        break;

      case  CommandType.SET_VALUE:
        this.task.Records.list[rowId].values[controlId] = command.str;
        let c = this.task.getFormControl(rowId, controlId);
        if (!isNullOrUndefined(c))
          c.setValue(command.str);

        break;
    }
  }

  regUpdatesUI() {
    this.task
      .refreshDom
      .filter(updates => updates.TaskTag == this.taskId)
      .subscribe(command => {
        this.executeCommand(command)
      });
  }


  mgGetText(controlId, rowId?) {
    return this.task.getProperty(controlId, HtmlProperties.Text, rowId);
  }

  mgGetTabpageText(controlId, layer) {
    const items = this.task.getProperty(controlId, HtmlProperties.ItemsList);
    if(typeof items !== "string")
      return items[layer-1].realString;
    return items;
  }

  mgGetImage(controlId, rowId?) {
    let result = this.task.getProperty(controlId, HtmlProperties.Image, rowId);
    return result;

  }

  mgIsImageExists(controlId, rowId?): boolean {
    let result = this.task.getProperty(controlId, HtmlProperties.Image, rowId);
    return !isNullOrUndefined(result);

  }

  mgGetClasses(controlId, rowId?) {
    return this.task.getClasses(controlId, rowId);
  }

  mgGetStyle(controlId: string, styleName:string, rowId?) {
    let style = this.task.getStyle(controlId, styleName, rowId)
    return style;
  }

  mgGetVisible(controlId, rowId?) {
    let vis: Boolean = this.getProperty(controlId, HtmlProperties.Visible, rowId);
    return vis ? 'visible' : 'hidden';
  }

  /*getEnable(controlId, rowId?) {
    return this.getProperty(controlId, HtmlProperties.Enabled, rowId);
  }*/

  /*isRowSelected(controlId, rowId?) {
    let selectedRow = this.getProperty(controlId, HtmlProperties.SelectedRow, "0") ;
    return selectedRow === rowId;
  }*/

  mgIsDisabled(controlId, rowId?) {
    let result = this.getProperty(controlId, HtmlProperties.Enabled, rowId);
    return result === "true" ? null : true;
  }

  getProperty(controlId: string, prop: HtmlProperties, rowId?: string) {
    return this.task.getProperty(controlId, prop, rowId);
  }

  mgGetTitle(controlId, rowId?) {
    return this.task.getProperty(controlId, HtmlProperties.Tooltip, rowId);
  }

  mgGetSelectedValue(controlId, rowId?) {
    return this.task.getProperty(controlId, HtmlProperties.SelectedValue, rowId);
  }

  mgGetPlaceholder(controlId, rowId?) {
    return this.task.getProperty(controlId, HtmlProperties.PlaceHolder, rowId);
  }

  mgGetType(controlId, rowId?) {
    return this.task.getProperty(controlId, HtmlProperties.Password, rowId) ? "password" : "text";
  }

  mgGetTabIndex(controlId, rowId?) {
    return this.task.getProperty(controlId, HtmlProperties.TabIndex, rowId);
  }

  mgGetValue(controlId, rowId?) {
    let val = this.task.getValue(controlId, rowId);
    return val;
  }

  mgGetListboxValues(id) {
    return this.getProperty(id, HtmlProperties.ItemsList);
  }

  public mgOnSelectionChanged(event: Event, idx: string) {
    this.task.insertEvent('selectionchanged', idx, (<any>(event.target)).selectedIndex.toString());
  }

  public mgOnTabSelectionChanged(idx:string, layer: number) {
    this.task.insertEvent('selectionchanged', idx, (layer-1).toString());
  }

  public mgIsTabPageSelected(controlId:string, layer: number) {
    let val = this.task.getProperty(controlId, HtmlProperties.SelectedValue);
    return val == (layer-1); // comparing string to number!
  }

  mgOnCheckChanged(event: Event, idx: string) {
    this.task.insertEvent('selectionchanged', idx, (<any>(event.target)).checked ? "1" : "0");
  }

  mgOnRadioSelectionChanged(event: Event, idx: string) {
    let result = this.task.getFormControl('0', idx);
    this.task.insertEvent('selectionchanged', idx, result.value);
  }
  mgOnPaginateChange(e)
  {
    this.getRowsIfNeed(e.pageIndex, e.pageSize) ;
  }
  jsonData :string
  public createData()
  {

    this.task.createData();

  }

  public loadData()
  {
    alert('Please, overwrite method loadData');
  }

  public loadStubData(stubData: any)
  {

    this.task.Records = stubData.records;
    this.task.settemplate(stubData.template);
    this.task.taskId = "1";
    for (let i = 0; i < this.task.Records.list.length; i++)
      this.task.buildTableRowControls(i);
  }
}

interface SubformDefinition {
  formName: string;
  parameters: any;
}
