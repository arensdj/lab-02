'use strict';

Photo.photoDataSet = [];
Photo.photosToRender = [];

Photo.readJson = (pageUrl = 'data/page-1.json') => {
  $.get(pageUrl, 'json')
    .then(data => {
      Photo.photoDataSet = [];
      data.forEach(photo => {
        Photo.photoDataSet.push(photo);
      });
    })
    .then(() => {
      Photo.render(Photo.photoDataSet)
    })
    .then(Photo.createOptions);
};

function Photo (photoObject) {
  for (let key in photoObject) {
    this[key] = photoObject[key];
  }
}

Photo.prototype.toHtml = function () {
  let $htmlTemplate = $('#photo-gallery-template').html();
  let templateRender = Handlebars.compile($htmlTemplate);
  return templateRender(this);
};

Photo.render = (dataObj) => {
  Photo.photosToRender = [];
  dataObj.forEach(photoObject => {
    Photo.photosToRender.push(new Photo(photoObject));
  });

  $('#photo-template').empty();

  Photo.photosToRender.forEach(ourPhotoObject => {
    $('#photo-template').append(ourPhotoObject.toHtml());
  });
};

Photo.createOptions = () => {
  const $selector = $('select');
  $('.dynamic-option').remove();
  let optionsAlreadyIncluded = [];

  Photo.photoDataSet.forEach((photo) => {
    if (!optionsAlreadyIncluded.includes(photo.keyword)) {
      optionsAlreadyIncluded.push(photo.keyword);
      let $newOption = $('select option:first').clone();
      $newOption.text(photo.keyword);
      $newOption.val(photo.keyword);
      $newOption.addClass('dynamic-option');
      $selector.append($newOption);
    }
  });
  $selector.on('change', function() {
    Photo.filterPhotos(Photo.photoDataSet, $(this).val());
  });
};

Photo.filterPhotos = (dataObj, filter) => {
  const outputData = [];
  dataObj.forEach((val) => {
    if (val.keyword === filter) {
      outputData.push(val);
    }
  });
  Photo.render(outputData);
};

$(() => { 
  Photo.readJson(); 

  $('#button1').on('click', () => {
    Photo.readJson('/data/page-1.json');
  });

  $('#button2').on('click', () => {
    Photo.readJson('/data/page-2.json');
  });
});

// Photo.allPhotos = [];

// Photo.prototype.render = function () {

//   $('main').append('<section class="clone"></section>');
//   const $photoClone = $('section[class="clone"]');


//   const $photoHtml = $('#photo-template').html();


//   $photoClone.html($photoHtml);


//   $photoClone.find('h2').text(this.title);
//   $photoClone.find('img').attr('src', this.image_url);
//   $photoClone.find('p').text(this.description);
//   $photoClone.removeClass('clone');
//   $photoClone.addClass(this.title);
//   $photoClone.attr('data-keyword', this.keyword);
// }

// Photo.readJson = () => {
//   $.get('./data/page-1.json', 'json')
//     .then(data => {
//       console.log(data);
//       data.forEach(photo => {
//         Photo.allPhotos.push(new Photo(photo));
//       });
//     })
//     .then(Photo.loadPhotos)
//     .then(Photo.createOptions);
// };

// Photo.createOptions = () => {
//   let $selector = $('select');
//   // console.log(Photo.allPhotos);
//   Photo.allPhotos.forEach((photo) => {
//     let $newOption = $('select option:first').clone();
//     $newOption.text(photo.keyword);
//     $newOption.val(photo.keyword);
//     $selector.append($newOption);
//   });
//   $selector.on('change', function() {
//     Photo.filterPhotos($(this).val());
//   });
// };

// Photo.filterPhotos = (filter) => {
//   $('section').hide();
//   Photo.allPhotos.forEach((photo) => { //eslint-disable-line
//     $(`section[data-keyword=${filter}]`).show();
//   });
// }

// Photo.loadPhotos = () => {
//   Photo.allPhotos.forEach(photo => photo.render());
// };

// $(() => Photo.readJson());


