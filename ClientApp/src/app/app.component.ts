import { Component, OnInit, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { BlogPostsQuery, BlogPostsGQL } from './graphql/graphql';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  blogPosts!: Observable<BlogPostsQuery>;
  public responsive: boolean = true;
  public config = {
    itemsPerPage: 1,
    // tslint:disable-next-line: radix
    currentPage: parseInt(sessionStorage.getItem('blogPage') || '') || 0
  };




  constructor(
    private router: Router,
    private allBlogPostGQL: BlogPostsGQL,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.blogPosts = this.allBlogPostGQL.watch().valueChanges.pipe(map(blogs => blogs.data));

    const body = new HttpParams()
      .set("client_id", "e0f660a2cf2a47babac40a4a8c24e7e0")
      .set("client_secret", "76945d3917a4456db5a41fc2949d6439")
      .set("grant_type", "client_credentials");
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
     console.log (body);
     this.http.post('https://OrchardCMS.net/connect/token', body, {headers: headers}).subscribe( res => {
        console.log(res);
        const jsonToken = res.toString();
        console.log(jsonToken);
        var token = JSON.parse(jsonToken, function (key, value) {
        if (key == "access_token") {
            return value;
          } else {
            return value;
          }
        });
        console.log(token) 
    });
  

  }

  onPageChange(number: number) {
    sessionStorage.setItem('blogPage', JSON.stringify(number));
    this.config.currentPage = number;
    console.log('eeeee', number);

  }

  showMore(name: string) {
    this.router.navigate(['/blog', name]);
    console.log('aaaaaaaa', this.config.currentPage)
  }
}
