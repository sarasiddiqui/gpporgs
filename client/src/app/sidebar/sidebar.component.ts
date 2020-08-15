import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Area } from '../model/area';
import { FormBuilder } from '@angular/forms';
import { LookUpComponent } from '../look-up/look-up.component';
import { TableComponent } from '../table/table.component'

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
  masterSelectedRegion: boolean;
  masterSelectedSector: boolean;
  checklistRegion:any;
  checklistSector:any;


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  

constructor(private appService: AppService, private dialog: MatDialog, private fb: FormBuilder) {
    const filter = appService.filterValue();
    this.checkedRegions = new Set(filter.regions);
    this.checkedSectors = new Set(filter.sectors);
    this.masterSelectedRegion = true;
    this.masterSelectedSector = true;
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
    this.checklistSector = [
      {id: 1, value: 'Agriculture / Food Security', isSelected: true},
      {id: 2, value: 'Collective Mobilization / Advocacy', isSelected: true},
      {id: 3, value: 'Disaster / Humanitarian Relief', isSelected: true},
      {id: 4, value: 'Education', isSelected: true},
      {id: 5, value: 'Energy', isSelected: true},
      {id: 6, value: 'Environment / Sustainability', isSelected: true},
      {id: 7, value: 'Fair Trade / Market Access', isSelected: true},
      {id: 8, value: 'Gender Empowerment', isSelected: true},
      {id: 9, value: 'Health', isSelected: true},
      {id: 10, value: 'Housing', isSelected: true},
      {id: 11, value: 'Human Rights / Law', isSelected: true},
      {id: 12, value: 'Hunger / Malnutrition', isSelected: true},
      {id: 13, value: 'Law', isSelected: true},
      {id: 14, value: 'Immigration', isSelected: true},
      {id: 15, value: 'Information Technology', isSelected: true},
      {id: 16, value: 'Microfinance', isSelected: true},
      {id: 17, value: 'Refugee / Displaced Persons', isSelected: true},
      {id: 18, value: 'Water / Sanitation', isSelected: true},
      {id: 19, value: 'Other', isSelected: true},
    ]
  }
  
  checkUncheckAllRegion() {
    this.masterSelectedRegion = !this.masterSelectedRegion;
    for (var i = 0; i < this.checklistRegion.length; i++) {
      this.checklistRegion[i].isSelected = this.masterSelectedRegion;
    }
    this.onRegionChange();

  }
  

  isAllSelectedRegion(id: number){
    var totalSelected = 0;
    for(var i = 0; i < this.checklistRegion.length; i++){
      if(this.checklistRegion[i].id == id){
        this.checklistRegion[i].isSelected = !this.checklistRegion[i].isSelected;
      }
      if(this.checklistRegion[i].isSelected == true){
        totalSelected = totalSelected + 1;
      }
    }
    this.masterSelectedRegion = (totalSelected == 9);
    this.onRegionChange();
  
  }


  checkUncheckAllSector() {
    this.masterSelectedSector = !this.masterSelectedSector;
    for (var i = 0; i < this.checklistSector.length; i++) {
      this.checklistSector[i].isSelected = this.masterSelectedSector;
    }
    this.onSectorChange();
 
  }

  isAllSelectedSector(id: number){
    var totalSelected = 0;
    for(var i = 0; i < this.checklistSector.length; i++){
      if(this.checklistSector[i].id == id){
        this.checklistSector[i].isSelected = !this.checklistSector[i].isSelected;
      }
      if(this.checklistSector[i].isSelected == true){
        totalSelected = totalSelected + 1;
      }

    }
    this.masterSelectedSector = (totalSelected == 19);
    this.onSectorChange();
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

  


  onSectorChange(): void {
  for(var i = 0; i < this.checklistSector.length; i++){
    if (this.checklistSector[i].isSelected == false) {
      this.checkedSectors.delete(this.checklistSector[i].id);
    } else {
      this.checkedSectors.add(this.checklistSector[i].id);
    }
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
