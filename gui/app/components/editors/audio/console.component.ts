import { Component, Input, Inject, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";

@Component({
    selector: 'console',
    template: `
<table class="table">
  <colgroup>
  <col width="130">
  <col width="auto">
  <col width="130">
  </colgroup>
  <thead>
    <tr>
     <th></th>
     <th></th>
     <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>
         12:34
      </th>
      <td>Upload audio file to server</td>
      <td><span style="color:green; float:right">OK</span></td>
    </tr>
  </tbody>
</table>
`
})
export class ConsoleComponent {
}
