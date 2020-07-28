import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material';
import { Area } from '../model/area';
import { FormBuilder } from '@angular/forms';
import { LookUpComponent } from '../look-up/look-up.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  area = Area;
  areaControl = this.fb.control(Area.ALL);
  checkedRegions: Set<number>;
  checkedSectors: Set<number>;
  masterSelected: boolean;
  checklistRegion:any;
  checklistSector:any;
  


  constructor(private appService: AppService, private dialog: MatDialog, private fb: FormBuilder) {
    const filter = appService.filterValue();
    this.checkedRegions = new Set(filter.regions);
    this.checkedSectors = new Set(filter.sectors);
    this.masterSelected = true;
    this.checklistRegion = [
      {id: 1, value: 'North America', isSelected: true},
      {id: 2, value: 'Mexico / Central America', isSelected: true},
      {id: 3, value: 'South America', isSelected: true},
      {id: 4, value: 'Europe', isSelected: true},
      {id: 5, value: 'Middle East / North Africa', isSelected: true},
      {id: 6, value: 'Sub-Saharan Africa', isSelected: true},
      {id: 7, value: 'China', isSelected: true},
      {id: 8, value: 'India', isSelected: true},
      {id: 9, value: 'Other', isSelected: true},
    ]
  }
  checkUncheckAll() {
    this.masterSelected = !this.masterSelected;
    for (var i = 0; i < this.checklistRegion.length; i++) {
      this.checklistRegion[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected(id: number){
    this.masterSelected = this.checklistRegion.every(function(item:any) {
      return item.isSelected == false;
    })
    for(var i = 0; i < this.checklistRegion.length; i++){
      if(this.checklistRegion[i].id == id){
        this.checklistRegion[i].isSelected = !this.checklistRegion[i].isSelected;
      }

    }
    this.onRegionChange();
  }

  getCheckedItemList(){
    this.onRegionChange();
  }

  ngOnInit() {
    this.areaControl.valueChanges.subscribe(() => this.updateArea());
  }

  sectors(): Iterable<number> {
    return [...this.appService.sectors.keys()];
  }

  sector(id: number): string {
    return this.appService.sectors.get(id);
  }

  regions(): Iterable<number> {
    return [...this.appService.regions.keys()];
  }

  region(id: number): string {
    return this.appService.regions.get(id);
  }

  getFistName(): string {
    return this.appService.userValue().firstName;
  }

  private updateArea(): void {
    const filter = this.appService.filterValue();
    filter.area = this.areaControl.value;
    this.appService.updateFilter(filter);
  }

  onRegionChange(): void {
    for(var i = 0; i < this.checklistRegion.length; i++){
      if (this.checklistRegion[i].isSelected == false) {
        this.checkedRegions.delete(this.checklistRegion[i].id);
      } else {
        this.checkedRegions.add(this.checklistRegion[i].id);
      }
    }
    
    const filter = this.appService.filterValue();
    filter.regions = new Set(this.checkedRegions);
    this.appService.updateFilter(filter);
  }

  


  onSectorChange(id: number): void {
    if (this.checkedSectors.has(id)) {
      this.checkedSectors.delete(id);
    } else {
      this.checkedSectors.add(id);
    }
    this.updateSectors();
  }

  private updateSectors(): void {
    const filter = this.appService.filterValue();
    filter.sectors = new Set<number>(this.checkedSectors);
    this.appService.updateFilter(filter);
  }

  openLookUpDialog(): void {
    const query = '{ organizations { id name address { country }} }';
    this.appService.queryService(query).subscribe(data => {
      this.dialog.open(LookUpComponent, {
        panelClass: 'mat-dialog--sm',
        data
      });
    });
  }
}
