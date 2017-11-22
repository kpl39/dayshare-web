import { Component, OnInit } from '@angular/core';
import { RouterDataService } from '../../../services/router-data.service';
import { ChildService } from '../../../services/child.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenComponent implements OnInit {

  children: any;
  categories: any;
  categoryNames = [];
  filteredCategories = [];

  constructor(
    private dataService: RouterDataService,
    private childService: ChildService
  ) { }

  ngOnInit() {
    if (this.dataService.profile) {
      this.children = this.dataService.profile.children;
    }
    this.dataService.profileDataLoaded.subscribe((profile) => {
      console.log('profile change', profile);
      this.children = profile.children;
    });

    this.getMetadataCategories();
  }

  getMetadataCategories() {
    this.childService.getMetadataCategories()
      .then((categories: any) => {
        console.log('categories', categories);
        this.categories = categories;
        categories.forEach((category) => {
          this.categoryNames.push(category.name);
        });
        console.log('category names', this.categoryNames);
      });
  }

  addNewMetadata(c) {
    const blankForm = {
      name: '',
      description: '',
      metadataCategory: {
        name: '',
        description: ''
      }
    };
    this.children[c].childMetadata.push(blankForm);
  }

  // filter(c, m) {
  //   const query = this.children[c].childMetadata[m].metadataCategory.name;
  //   this.children[c].childMetadata[m].active = true;
  //   console.log('children', this.children);
  //
  //   if (query !== '') {
  //     const filtered = [];
  //
  //     this.categories.forEach((category) => {
  //       if (category.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
  //         filtered.push(category);
  //       }
  //     });
  //     this.filteredCategories = filtered;
  //   } else {
  //     this.filteredCategories = [];
  //   }
  //   console.log('filtered list', this.filteredCategories);
  // }
  //
  // select(c, m, category) {
  //   const categoryCopy = Object.assign({}, category)
  //   this.children[c].childMetadata[m].metadataCategory = categoryCopy;
  //   this.filteredCategories = [];
  //   this.children[c].active = false;
  //   console.log('selected', categoryCopy);
  //   console.log('all categories', this.categories);
  // }

  toggleEdit(c, m) {
    const meta = this.children[c].childMetadata[m];
    if (meta.active === true) {
      meta.active = false;
    } else {
      meta.active = true;
    }
  }

  deleteMeta(c, m) {
    this.children[c].childMetadata.splice(m, 1);
  }

}
