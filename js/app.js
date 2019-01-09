'use strict';

function Photo(photoData) {
  this.image_url = photoData.image_url;
  this.title = photoData.title;
  this.description = photoData.description;
  this.keyword = photoData.keyword;
  this.horns = photoData.horns;
}

Photo.allPhotos = [];

Photo.prototype.render = function () {
  // console.log(filter);
  $('main').append('<section class="clone"></section>');
  const $photoClone = $('section[class="clone"]');

  // get the html of the template
  const $photoHtml = $('#photo-template').html();

  // set the section's html === template html
  $photoClone.html($photoHtml);

  // fill in the properties from each instance
  $photoClone.find('h2').text(this.title);
  $photoClone.find('img').attr('src', this.image_url);
  $photoClone.find('p').text(this.description);
  $photoClone.removeClass('clone');
  $photoClone.addClass(this.title);
  $photoClone.attr('data-keyword', this.keyword);
}

Photo.readJson = () => {
  $.get('../data/page-1.json', 'json')
    .then(data => {
      console.log(data);
      data.forEach(photo => {
        Photo.allPhotos.push(new Photo(photo));
      });
    })
    .then(Photo.loadPhotos)
    .then(Photo.createOptions);
};

Photo.createOptions = () => {
  let $selector = $('select');
  // console.log(Photo.allPhotos);
  Photo.allPhotos.forEach((photo) => {
    let $newOption = $('select option:first').clone();
    $newOption.text(photo.keyword);
    $newOption.val(photo.keyword);
    $selector.append($newOption);
  });
  $selector.on('change', function() {
    Photo.filterPhotos($(this).val());
  });
};

Photo.filterPhotos = (filter) => {
  $('section').hide();
  Photo.allPhotos.forEach((photo) => {
    $(`section[data-keyword=${filter}]`).show();
  });
}

Photo.loadPhotos = () => {
  Photo.allPhotos.forEach(photo => photo.render());
};

$(() => Photo.readJson());
