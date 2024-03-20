package com.sena.riap.api;

import com.sena.riap.entities.EventData;
import com.sena.riap.service.EventDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
@RequestMapping("/api_event_data")
public class EventDataRestController {

    @Autowired
    private EventDataService eventDataService;


    @GetMapping("/list_event_data")
    public List<EventData> listEventData() {
        return eventDataService.getEventData();
    }

    @GetMapping("/find/{id_event}")
    public EventData getEventData(@PathVariable("id_event") Long idEvent) {
        return eventDataService.getEventDataById(idEvent);
    }

    @PostMapping("/save")
    public EventData saveEventData(@RequestBody EventData eventData) {
        return eventDataService.saveEventData(eventData);
    }

    @PutMapping("/update/{id_event}")
    public EventData updateEventData(@PathVariable("id_event") Long idEvent, @RequestBody EventData eventData) {
        return eventDataService.updateEventData(idEvent, eventData);
    }

    @DeleteMapping("/delete/{id_event}")
    public void deleteEventData(@PathVariable("id_event") Long idEvent) {
        eventDataService.deleteEventData(idEvent);
    }

}
