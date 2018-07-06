import { Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DialogData {
  channelId: string;
}

declare var device;

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.pug',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{
  isDrawerOpen = false;

  ngOnInit() { 
    document.addEventListener("deviceready", function() { 
      alert(device.platform); 
    }, false); 
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, private dataService: DataService) {}
  isListingActive(listing){
    let creator;
    for(creator of this.dataService.creators){
      if(listing.creator.title == creator.title) break;
    }
    return creator.isActive;
  }
}
