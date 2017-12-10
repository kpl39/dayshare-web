import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent implements OnInit {

  contactForm: any;
  messageBody: String;
  messageSent: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    console.log("Parent Data", this.data);

    this.contactForm = this.fb.group(
      {
        messageBody: ['', Validators.required]
      });
  }

  sendMessage() {
    console.log("Message", this.messageBody);

    let pkg = {
      senderId: this.data.senderId,
      recipientId: this.data.recipientId,
      dateTime: new Date().toISOString(),
      messageText: this.messageBody,
      unread: true
    };
    this.messageService.sendPrivateMessage(pkg)
      .then((res) => {
        this.messageSent = true;
        setTimeout(() => {
          this.dialogRef.close();
        }, 1000);
        
      })
  }

}
