import { Component, OnInit, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { map, take, catchError } from "rxjs/operators";
import { BlogPostsQuery, BlogPostsGQL } from "../graphql/graphql";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"]
})
export class BlogComponent implements OnInit {
  public responsive: boolean = true;
  blogPosts!: Observable<BlogPostsQuery>;
  modalIsActive!: boolean;
  values!: string;
  baseURL = environment.serverURL;
  public config = {
    itemsPerPage: 1,
    // tslint:disable-next-line: radix
    currentPage: parseInt(sessionStorage.getItem("blogPage") || "") || 0
  };

  constructor(
    private router: Router,
    private allBlogPostGQL: BlogPostsGQL,
    private http: HttpClient
  ) {}

  ngOnInit() {

      this.blogPosts = this.allBlogPostGQL
      .watch()
      .valueChanges.pipe(map(blogs => blogs.data));
  }

  onPageChange(number: number) {
    sessionStorage.setItem("blogPage", JSON.stringify(number));
    this.config.currentPage = number;
    console.log("eeeee", number);
  }

  showMore(name: string) {
    var ln = name.length; 
    var id = name.substr(5,ln);    
    this.router.navigate(["/blog", id]);
    console.log("aaaaaaaa", this.config.currentPage);
  }
}
