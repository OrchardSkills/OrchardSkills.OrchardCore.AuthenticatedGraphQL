import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentBlogQuery, CurrentBlogGQL } from '../graphql/graphql';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss']
})
export class BlogContentComponent implements OnInit {
  blogPost!: Observable<CurrentBlogQuery>;
  maxSize: number = 0;
  number = parseInt(sessionStorage.getItem('page') || '') || 1
  public markdown = "# Markdown";
  name!: string;
  baseURL = environment.serverURL;
  constructor(private route: ActivatedRoute, private router: Router, private currentBlogPostGQL: CurrentBlogGQL) { }
  public config = {
    itemsPerPage: 1,
    currentPage: parseInt(sessionStorage.getItem('page') || '') || 0,

  };
  p: number = 0;

  ngOnInit() {

    this.route.params.subscribe((prams) => {
    const url = 'blog/' + `${prams.path}`;
     this.blogPost = this.currentBlogPostGQL.watch({
       urlPath: url
     }).valueChanges.pipe(map(blog => blog.data))
    })

  }

  onPageChange(name: string, number: number) {
    this.router.navigate(['blog/', name])
    sessionStorage.setItem('page', JSON.stringify(number))
    this.config.currentPage = number
    console.log('aaaaa', number)

  }

}
