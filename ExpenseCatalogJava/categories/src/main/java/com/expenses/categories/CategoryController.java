package com.expenses.categories;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import io.dapr.Topic;
import io.dapr.client.domain.CloudEvent;
import reactor.core.publisher.Mono;


@RestController
public class CategoryController {
	@Autowired
   	private StringRedisTemplate template;    

	@GetMapping("/category")
	public ResponseEntity<ArrayList<Category>> getCategories() {
		CategoryRepository repo = new CategoryRepository(template); 
        return new ResponseEntity<>(repo.getCategories(), HttpStatus.OK);
	}

	@Topic(name = "expensetopic", pubsubName = "servicebus-pubsub")
	@PostMapping(value="/category", consumes = MediaType.ALL_VALUE)
	public Mono<Void> addCategory(@RequestBody(required = false) CloudEvent<Category> cloudEvent) {
		CategoryRepository repo = new CategoryRepository(template); 
		return Mono.fromRunnable(() -> {
			try {		
				repo.addCategory(cloudEvent.getData());				
			} catch (Exception e) {
				throw new RuntimeException(e);
			}		
		});			
	}
	
    
}
