import View from './View.js';
import icons from '../../img/icons.svg'; //creating a path

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    // const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateMarkupNextBtn();
    }
    //Page 1, and there are No other pages
    //Last page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupPreviousBtn();
    }
    //Other page
    if (this._data.page < numPages) {
      return [this._generateMarkupPreviousBtn(), this._generateMarkupNextBtn()];
    }
    return ' ';
  }
  _generateMarkupPreviousBtn() {
    // data-goto is the DATA ATTRIBUTE that can identify the specific page

    return `
      <button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>
      `;
  }
  _generateMarkupNextBtn() {
    return `
    <button data-goto="${
      this._data.page + 1
    }" class="btn--inline pagination__btn--next">
          <span>Page ${this._data.page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button> 
    `;
  }
}

export default new PaginationView();
