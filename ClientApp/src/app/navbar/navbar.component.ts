import { Component, OnInit } from '@angular/core';
import { SearchQueryGQL, SearchQueryQuery, SearchQueryDocument } from 'src/app/graphql/graphql';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isActive: boolean;
  add!: boolean;
  searchPosts!: Observable<SearchQueryQuery>
  baseURL = environment.serverURL;
  unSubscribe!: Subscription;
  constructor(private searchBlog: SearchQueryGQL, private router: Router) { }

  ngOnInit(): void {
  }

  openSearch() {
    this.add = !this.add
  }

  // toggle navbar on mobile view
  toggleNavbar() {
    this.isActive = !this.isActive;
  }
  search(event: string) {
    const searchParameter = `{\"Term\": \"${event}\"}`
    this.searchPosts = this.searchBlog.watch({
      parameters: searchParameter
    }).valueChanges.pipe(map(blogs => blogs.data))
  }
  navigate(name: string) {
    var ln = name.length; 
    var id = name.substr(5,ln);    
    this.router.navigate(['/blog', id], { replaceUrl: true });
    this.openSearch()
  }
  ngOnDestroy() {
    this.unSubscribe.unsubscribe();
  }
}
