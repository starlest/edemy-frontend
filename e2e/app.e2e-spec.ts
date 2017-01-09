import { EdemyFrontendPage } from './app.po';

describe('edemy-frontend App', function() {
  let page: EdemyFrontendPage;

  beforeEach(() => {
    page = new EdemyFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
