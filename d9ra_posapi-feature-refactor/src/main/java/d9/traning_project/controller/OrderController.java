package d9.traning_project.controller;

import d9.traning_project.exception.BadRequestException;
import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.dto.request.OrderRequest;
import d9.traning_project.model.dto.response.OrderResponse;
import d9.traning_project.service.impl.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController extends BaseController<OrderRequest, OrderResponse, OrderService> {
    @PostMapping("/buy")
    public ResponseEntity<?> order(@Valid @ModelAttribute OrderRequest orderRequest) {
        try {
            return new ResponseEntity<>(service.order(orderRequest), HttpStatus.OK);
        } catch (NotFoundException | BadRequestException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/changeStt/{idOrder}/{statusCode}")
    public ResponseEntity<?> changeSttOrder(@PathVariable Long idOrder, @PathVariable int statusCode) {
        return new ResponseEntity<>(service.changeStatus(idOrder, statusCode), HttpStatus.OK);
    }

    @GetMapping("/count/{date}")
    public int getOrderByDate(@PathVariable String date) throws ParseException {
        return (service.countOrderByDate(date));
    }

    @GetMapping("/total/{date}")
    public double totalAmountByDate(@PathVariable String date) throws ParseException {
        return (service.totalByDate(date));
    }

    @GetMapping("/countPending/{date}")
    public int getPendingByDate(@PathVariable String date) throws ParseException {
        return (service.countPendingByDate(date));
    }

    @GetMapping("/countSuccess/{date}")
    public int getSuccessByDate(@PathVariable String date) throws ParseException {
        return (service.countSuccessByDate(date));
    }

    @GetMapping("/countCancel/{date}")
    public int getCancelByDate(@PathVariable String date) throws ParseException {
        return (service.countCancelByDate(date));
    }

    @GetMapping("/countMonth/{month}/{year}")
    public int countOrderByMonth(@PathVariable int month, @PathVariable int year) {
        return (service.countOrderByMonth(month, year));
    }

    @GetMapping("/totalMonth/{month}/{year}")
    public double totalByMonth(@PathVariable int month, @PathVariable int year) {
        return (service.totalByMonth(month, year));
    }

    @GetMapping("/{email}/history")
    public ResponseEntity<List<OrderResponse>> getHistory(@PathVariable String email) {
        return new ResponseEntity<>(service.getHistory(email), HttpStatus.OK);
    }
}
