import { ClassroomnewPage } from './app.po';

describe('classroomnew App', function() {
  let page: ClassroomnewPage;

  beforeEach(() => {
    page = new ClassroomnewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
