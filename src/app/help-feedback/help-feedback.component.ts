import { Component, OnInit } from '@angular/core';
import { SearchQueService } from '../search-que.service';
import { FormsModule } from '@angular/forms';
import { FAQ } from './faq';

@Component({
  selector: 'app-help-feedback',
  standalone: false,
  templateUrl: './help-feedback.component.html',
  styleUrl: './help-feedback.component.css'
})
export class HelpFeedbackComponent implements OnInit{
  faqs: FAQ[] = []; // all the faqs from db
  filteredFaqs : FAQ[] = []; //filtered faq after seach
  searchQuery: string = ''; // the query written by person

  stopwords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he','in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will','with', 'you', 'your', 'but', 'how', 'what', 'which', 'who', 'whom', 'where','why', 'can', 'could', 'should', 'would', 'may', 'might', 'must', 'have', 'had', 'do', 'does', 'did', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being'
]);
  constructor(private searchQuestionService : SearchQueService){};

  ngOnInit(): void {
    this.searchQuestionService.getFaqs().subscribe({
      next : (data) => {this.faqs = data || [];
                        //this.filteredFaqs = this.faqs;
                      },
      error : (err) => {alert(JSON.stringify(err));
      },
      complete : () => console.log('Getting data from backend')
    });
  }

  onSearch(){
    const raw = (this.searchQuery || '').toLowerCase();
    
    // 1. normalize and clean query
    const query = raw.replace(/[^\w\s]/g, '').trim(); // remove all puntation, trim
    console.log(query);

    if(!query){
      alert("The search box is empty.");
      return;
    }

    //2. tokenization(split into words, ignore 2 letter token)
    const tokens = query.split(/\s+/).filter(t => t.length > 2 && !this.stopwords.has(t));
    console.log(tokens);

    //3. filter logic : match tokens aginst the question text or tags
      this.filteredFaqs = this.faqs.filter(faq => {
      const question = (faq.question || "").toLowerCase();
      const tags = (faq.tags || []).map((t: string) => t.toLowerCase());

      return tokens.some(token =>
        question.includes(token) ||
        tags.some((tag: string) => tag.includes(token))
      );
    });

    console.log({ query, tokens, results: this.filteredFaqs.length});
  }

}
