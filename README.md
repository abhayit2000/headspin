# headspin

Hi HeadSpin folk! As directed, I built an interactive UI that allows for tagging objects, and creating 
selections based on those tags. 

It has the following functionality:
  1. You can add and delete tags to Download Sessions. 
  2. You can add and delete Selections based on 1 or more tags.
  3. If you hover over a Selection, the matching Download Sessions highlight. 
  4. If you delete or add a tag, the Selection will update immediately. 
  
## Implementation

I decided to use React/Flux on this project. It's probably overkill for the scope of this task but I did it anyway because 1) 
it would scale well 2) I wanted to show off what I knew. 

The main goal of Flux is unidirectional data flow made up of four main segments (see the Frontend folder). The user interacts with the components (views), which triggers a call to the actions. Traditionally, 
the action creators would be responsible for pinging the server with an AJAX request but in this case it just pulls from the raw JSON file instead. 
Next, the action creator pushes data to the Dispatcher and the Dispatcher pushes out to the stores (only one store in this case). The store
is responsible for storing and manipulating data, and emitting change to the components, thus completing the loop. 

## With more time...

With more time, I think it would be great to implement autocomplete since there are a theoretically limited number of tags. Also, 
if this project were to scale, I'd need to make a more complex and time efficient way to create selections. 

Other notes:

  1. The space theme was inspired by [HeadSpin](https://www.headspin.io) homepage.
  2. Have a nice day! :)
