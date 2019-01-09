'use strict';

function Photo(photoData) {
    this.image_url = photoData.image_url;
    this.title = photoData.title;
    this.description = photoData.description;
    this.keyword = photoData.keyword;
    this.horns = photoData.horns;
}

Photo.allPhotos = [];

Photo.prototype.render = function() {
    $('main').append('<section class="clone"></section>');
    const $photoClone = $('section[class="clone"]');
  
    // get the html of the template
    const $photoHtml = $('#photo-template').html();
  
    // set the section's html === template html
    $photoClone.html( $photoHtml );
  
    // fill in the properties from each instance
    $photoClone.find('h2').text(this.title);
    $photoClone.find('img').attr('src', this.image_url);
    $photoClone.find('p').text(this.description);
    $photoClone.removeClass('clone');
    $photoClone.addClass(this.title);
}

Photo.readJson = () => {
    $.get('../data/page-1.json', 'json')
      .then(data => {
        console.log(data);
        data.forEach(photo => {
          Photo.allPhotos.push( new Photo(photo) );
        });
      })
      .then(Photo.loadPhotos);
  };

  Photo.loadPhotos = () => {
    Photo.allPhotos.forEach(photo => photo.render());
  };
  
  $(() => Photo.readJson());