package com.example.instagramclone.config;

import com.example.instagramclone.model.Comment;
import com.example.instagramclone.model.Like;
import com.example.instagramclone.model.Post;
import com.example.instagramclone.model.User;
import com.example.instagramclone.repository.CommentRepository;
import com.example.instagramclone.repository.LikeRepository;
import com.example.instagramclone.repository.PostRepository;
import com.example.instagramclone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;

    @Autowired
    public DataInitializer(
            UserRepository userRepository,
            PostRepository postRepository,
            CommentRepository commentRepository,
            LikeRepository likeRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.likeRepository = likeRepository;
    }

    @Override
    public void run(String... args) {
        // Create users
        User user1 = new User();
        user1.setUsername("johndoe");
        user1.setFullName("John Doe");
        user1.setBio("Software developer and photography enthusiast");
        user1.setProfilePicture("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop");
        user1.setCreatedAt(LocalDateTime.now());

        User user2 = new User();
        user2.setUsername("janedoe");
        user2.setFullName("Jane Doe");
        user2.setBio("Travel lover | Food enthusiast");
        user2.setProfilePicture("https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop");
        user2.setCreatedAt(LocalDateTime.now());

        User user3 = new User();
        user3.setUsername("mikesmith");
        user3.setFullName("Mike Smith");
        user3.setBio("Photographer | Adventurer");
        user3.setProfilePicture("https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop");
        user3.setCreatedAt(LocalDateTime.now());

        List<User> users = Arrays.asList(user1, user2, user3);
        userRepository.saveAll(users);

        // Create posts
        Post post1 = new Post();
        post1.setImageUrl("https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1000&auto=format&fit=crop");
        post1.setCaption("Beautiful sunset at the beach #sunset #beach");
        post1.setCreatedAt(LocalDateTime.now().minusDays(2));
        post1.setUser(user1);

        Post post2 = new Post();
        post2.setImageUrl("https://images.unsplash.com/photo-1682687220208-22d7a2543e88?q=80&w=1000&auto=format&fit=crop");
        post2.setCaption("Delicious brunch with friends #foodie #brunch");
        post2.setCreatedAt(LocalDateTime.now().minusDays(1));
        post2.setUser(user2);

        Post post3 = new Post();
        post3.setImageUrl("https://images.unsplash.com/photo-1682687220923-c58b9a4592ea?q=80&w=1000&auto=format&fit=crop");
        post3.setCaption("Exploring the mountains #adventure #hiking");
        post3.setCreatedAt(LocalDateTime.now().minusHours(12));
        post3.setUser(user3);

        Post post4 = new Post();
        post4.setImageUrl("https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1000&auto=format&fit=crop");
        post4.setCaption("City lights at night #cityscape #night");
        post4.setCreatedAt(LocalDateTime.now().minusHours(6));
        post4.setUser(user1);

        List<Post> posts = Arrays.asList(post1, post2, post3, post4);
        postRepository.saveAll(posts);

        // Create comments
        Comment comment1 = new Comment();
        comment1.setContent("Amazing view!");
        comment1.setCreatedAt(LocalDateTime.now().minusDays(1));
        comment1.setUser(user2);
        comment1.setPost(post1);

        Comment comment2 = new Comment();
        comment2.setContent("Looks delicious!");
        comment2.setCreatedAt(LocalDateTime.now().minusHours(23));
        comment2.setUser(user3);
        comment2.setPost(post2);

        Comment comment3 = new Comment();
        comment3.setContent("Great shot!");
        comment3.setCreatedAt(LocalDateTime.now().minusHours(10));
        comment3.setUser(user1);
        comment3.setPost(post3);

        Comment comment4 = new Comment();
        comment4.setContent("Where is this?");
        comment4.setCreatedAt(LocalDateTime.now().minusHours(5));
        comment4.setUser(user3);
        comment4.setPost(post4);

        Comment comment5 = new Comment();
        comment5.setContent("I want to go there too!");
        comment5.setCreatedAt(LocalDateTime.now().minusHours(4));
        comment5.setUser(user2);
        comment5.setPost(post3);

        List<Comment> comments = Arrays.asList(comment1, comment2, comment3, comment4, comment5);
        commentRepository.saveAll(comments);

        // Create likes
        Like like1 = new Like();
        like1.setCreatedAt(LocalDateTime.now().minusDays(1));
        like1.setUser(user2);
        like1.setPost(post1);

        Like like2 = new Like();
        like2.setCreatedAt(LocalDateTime.now().minusHours(23));
        like2.setUser(user3);
        like2.setPost(post1);

        Like like3 = new Like();
        like3.setCreatedAt(LocalDateTime.now().minusHours(22));
        like3.setUser(user1);
        like3.setPost(post2);

        Like like4 = new Like();
        like4.setCreatedAt(LocalDateTime.now().minusHours(10));
        like4.setUser(user1);
        like4.setPost(post3);

        Like like5 = new Like();
        like5.setCreatedAt(LocalDateTime.now().minusHours(9));
        like5.setUser(user2);
        like5.setPost(post3);

        Like like6 = new Like();
        like6.setCreatedAt(LocalDateTime.now().minusHours(5));
        like6.setUser(user3);
        like6.setPost(post4);

        List<Like> likes = Arrays.asList(like1, like2, like3, like4, like5, like6);
        likeRepository.saveAll(likes);
    }
}
