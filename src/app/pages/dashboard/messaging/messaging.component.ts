import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {
  conversation: any;
  primary = 1;
  secondary = 2;

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getConversation();
  }

  getConversation() {
    this.messageService.getConversation('test')
      .then((conversation) => {
        this.conversation = conversation;
        console.log("Conversation", conversation);
      })
  }

}
