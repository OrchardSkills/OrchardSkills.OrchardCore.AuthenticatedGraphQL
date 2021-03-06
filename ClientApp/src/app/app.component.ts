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
import { AuthService } from './core/auth.service';
import { environment } from 'src/environments/environment';

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
    private http: HttpClient,
    private auth: AuthService
  ) { }

  ngOnInit() {

    const url = environment.serverURL + '/connect/token/';
    this.blogPosts = this.allBlogPostGQL.watch().valueChanges.pipe(map(blogs => blogs.data));

    const body = new HttpParams()
      .set("client_id", "e0f660a2cf2a47babac40a4a8c24e7e0")
      .set("client_secret", "76945d3917a4456db5a41fc2949d6439")
      .set("grant_type", "client_credentials");
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
     
    this.http.post(url, body, {headers: headers}).subscribe( res => {
      console.log(res);
      const jsonToken = res['access_token'];
      localStorage.setItem('access_token', jsonToken)
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
