import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'services/tools.service';
import { Outil } from 'models/outil.model';


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  outilSource: Outil[] = [];
  toolReceivedByService: any;
  constructor(private toolsService: ToolsService) { }

  ngOnInit(): void {
      this.toolsService.getAllTools().then((tool) => {
        this.toolReceivedByService = tool;
        console.log('Found Tools');
        this.toolReceivedByService = tool;
      });
  }

}
