package com.sena.riap.api;

import com.sena.riap.entities.EventData;
import com.sena.riap.entities.UserData;
import com.sena.riap.service.EventDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EventDataRestController {

    @Autowired
    private EventDataService eventDataService;


    @GetMapping("/event_data")
    public List<EventData> listEventData() {
        return eventDataService.getEventData();
    }

    @GetMapping("/event_data/{id_event}")
    public EventData getEventData(@PathVariable("id_event") Long idEvent) {
        return eventDataService.getEventDataById(idEvent);
    }

    @PostMapping("/event_data")
    public EventData saveEventData(@RequestBody EventData eventData) {
        return eventDataService.saveEventData(eventData);
    }

    @PutMapping("/event_data/{id_event}")
    public EventData updateEventData(@PathVariable("id_event") Long idEvent, @RequestBody EventData eventData) {
        return eventDataService.updateEventData(idEvent, eventData);
    }

    @DeleteMapping("/event_data/{id_event}")
    public void deleteEventData(@PathVariable("id_event") Long idEvent) {
        eventDataService.deleteEventData(idEvent);
    }


}
